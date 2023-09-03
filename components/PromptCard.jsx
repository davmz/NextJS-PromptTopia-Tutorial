"use client";

import { useState } from "react";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const router = useRouter();
    const pathName = usePathname();
    const { data: session } = useSession();

    const [copied, setCopied] = useState("");

    const handleCopy = () => {
        setCopied(post.prompt);
        window.navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(""), 3000);
    };

    const handleProfileClick = () => {
        console.log(post);
    
        if (post.creator._id === session?.user.id) return router.push("/profile");
    
        router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    };

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div
                    onClick={handleProfileClick}
                    className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
                >
                    <Image
                        width={40}
                        height={40}
                        alt="user_image"
                        src={post.creator.image}
                        className="rounded-full object-contain"
                    />

                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">
                            {post.creator.username}
                        </h3>

                        <p className="font-inter text-sm text-gray-500">
                            {post.creator.email}
                        </p>
                    </div>
                </div>

                <div
                    className="copy_btn"
                    onClick={handleCopy}
                >
                    <Image
                        width={12}
                        height={12}
                        src={copied === post.prompt
                            ? "/assets/icons/tick.svg"
                            : "/assets/icons/copy.svg"
                        }
                        alt={copied === post.prompt
                            ? "tick_icon"
                            : "copy_icon"
                        }
                    />
                </div>
            </div>

            <p className="my-4 font-satoshi text-sm text-gray-700">
                {post.prompt}
            </p>

            <p
                onClick={() => { handleTagClick && handleTagClick(post.tag) }}
                className="font-inter text-sm blue_gradient cursor-pointer"
            >
                {post.tag}
            </p>

            {session?.user.id === post.creator._id && pathName === "/profile" && (
                <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                    <p
                        onClick={handleEdit}
                        className="font-inter text-sm green_gradient cursor-pointer"
                    >
                        Edit  
                    </p>

                    <p
                        onClick={handleDelete}
                        className="font-inter text-sm orange_gradient cursor-pointer"
                    >
                        Delete  
                    </p>
                </div>
            )}
        </div>
    );
};

export default PromptCard;