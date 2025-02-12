import React, { useCallback, useEffect, useState } from 'react';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';
import { useAuth } from '../store/Auth';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from './Loading';


const CommentBox = () => {
  const { User, Provider } = useAuth();
  const { chapterId, courseId } = useParams();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate()
  const APP_API_URL = "http://localhost:8000"

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${ APP_API_URL}/api/course/fetchcomments/${courseId}/${chapterId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const formattedComments = data.comments.map((item) => ({
          userId: item.userId._id,
          comId: item._id,
          fullName: item.userId.username,
          userProfile: `https://profile-link.com/${item.userId._id}`,
          text: item.comment,
          avatarUrl: `https://ui-avatars.com/api/?name=${item.userId.username}&background=random`,
          timestamp: item.createdAt,
          replies: item.replies || [],
        }));
        setComments(formattedComments);
      } 
    } catch (error) {
      console.log("Error in fetching comment")
    } finally {
      setLoading(false);
    }
  }, [APP_API_URL, courseId, chapterId, token]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments])
  
  const handleAddComment = async (data) => {
    setSending(true);
    try {
      const response = await fetch(
        `${ APP_API_URL}/api/addcomment/${courseId}/${chapterId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
           'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment: data.text }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setSending(false);
        toast.success(result.msg);
        fetchComments();
      } else {
        toast.error(result.msg);
        setSending(false);
      }
    } catch (error) {
      toast.error('Error adding comment');
    }
  };

  const handleEditComment = async (data) => {
    setSending(true);
    try {
      const response = await fetch(
        `${ APP_API_URL}/api/editcomment/${courseId}/${chapterId}/${data.comId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment: data.text }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success(result.msg);
        fetchComments();
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      toast.error('Error editing comment');
    } finally {
      setSending(false);
    }
  };

  const handleDeleteComment = async (data) => {
    setSending(true);
    try {
      const response = await fetch(
        `${ APP_API_URL}/api/deletecomment/${courseId}/${chapterId}/${data.comIdToDelete}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success(result.msg);
        fetchComments();
        setSending(false)
      } else {
        toast.error(result.msg);
        setSending(false)
      }
    } catch (error) {
      toast.error('Error deleting comment');
      setSending(false)
      console.log(error)
    } 
  };

  if (loading) {
    return (
      <>
        <h5>Comments</h5>
        <Loading />
      </>
    );
  }

  return (
    <>
      {sending && <Loading />}
      <CommentSection
        currentUser={
          User
            ? {
                currentUserId: User._id,
                currentUserImg: `https://ui-avatars.com/api/?name=${User.username}&background=random`,
                currentUserFullName: User.username,
              }
            : (
              Provider ? {
                currentUserId: Provider._id,
                currentUserImg: `https://ui-avatars.com/api/?name=${Provider.username}&background=random`,
                currentUserFullName: Provider.username,
              } : null
            ) 
        }
        logIn={{
          onLogin: () => navigate("/login"),
          signUpLink: '/login',
        }}
        commentData={comments}
        onSubmitAction={handleAddComment}
        onEditAction={handleEditComment}
        onDeleteAction={handleDeleteComment}
        currentData={(data) => {
          console.log('Current data', data);
        }}
      />
    </>
  );
};

export default CommentBox;
