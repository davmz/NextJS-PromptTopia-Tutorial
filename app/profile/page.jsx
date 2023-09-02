"use client"

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        };

        if (session?.user.id) fetchPosts();
    }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this post?");
  
      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE",
          });
  
          const filteredPosts = posts.filter((p) => p._id !== post._id);
  
          setPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
        <Profile
            name="My"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            desc="Welcome to your personalized profile page"
        />
    );
};

export default MyProfile;