import React, { useEffect, useState } from 'react';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';
import { useAuth } from '../store/Auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from './Loading';

const CommentBox = () => {
  const { User } = useAuth();
  const APP_URI = "http://localhost:8000";
  const { chapterId, courseId } = useParams();
  const token = localStorage.getItem("token");
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [data, setCommentData] = useState([]);

  useEffect(() => {
    if (User) {
      console.log(User)
      setUserName(User.username || "");
    }
  }, [User]);

  const addComment = async (content) => {
    setSending(true);
    const comment = content.text;
    try {
      const response = await fetch(
        `${APP_URI}/api/addcomment/${courseId}/${chapterId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSending(false);
        toast.success(data.msg);
        fetchComment(); // Refresh comments
      } else {
        setSending(false);
        toast.success(data.msg);
      }
    } catch (error) {
      toast.error("Error");
      setSending(false);
    }
  };

  const fetchComment = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${APP_URI}/api/course/fetchcomments/${courseId}/${chapterId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const formattedData = data.comments.map((item) => ({
          userId: item.userId._id || "Anonymous",
          comId: item._id, // Unique comment ID
          fullName: item.userId.username || "Anonymous User",
          userProfile: `https://profile-link.com/${item.userId}`, // Placeholder profile link
          text: item.comment, // Comment text
          avatarUrl: `https://ui-avatars.com/api/name=${item.username || "Anonymous"}&background=random`,
          timestamp: item.createdAt || new Date().toISOString(),
          isEditable: item.userId._id === User?._id, // Check if the comment belongs to the logged-in user
          isDeletable: item.userId._id === User?._id, // Same check for delete
          replies: [], // Add replies if applicable
        }));
        setCommentData(formattedData);
        setLoading(false);
      } else {
        setCommentData([]);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error fetching comments");
      setCommentData([]);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchComment();
  }, []);

  if(loading){
    return(
      <>
      <h5> Comments </h5>
      <Loading />
      </>
    ) 
  }
  return (
    <>
    {sending && (<Loading></Loading>)}
    <CommentSection
    currentUser={{
      currentUserId: User?._id, // Dynamically set the current user ID
      currentUserImg: `https://ui-avatars.com/api/name=${username}&background=random`,
      currentUserFullName: `${username}`,
    }}
    
    logIn={{
      onLogin: () => alert('Call login function'),
      signUpLink: 'http://localhost:3001/',
    }}

    
      commentData={data.map((comment) => ({
        ...comment,
      actions: comment.userId === User?._id // Check if the comment belongs to the current user
        ? [
            {
              type: 'edit',
              label: 'Edit',
              action: () => console.log(`Edit comment with ID: ${comment.comId}`), // Replace with your edit logic
            },
            {
              type: 'delete',
              label: 'Delete',
              action: () => console.log(`Delete comment with ID: ${comment.comId}`), // Replace with your delete logic
            },
          ]
          : [], // No actions for comments not owned by the current user
        })
      )}
      placeholder="Write your comment..."
      onSubmitAction={(data) => addComment(data)}
      currentData={(data) => {
        console.log('current data', data);
      }}
      />
      </>
    
  );
};

export default CommentBox;
