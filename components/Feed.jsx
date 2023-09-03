"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

import { XIcon } from '@heroicons/react/solid';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard
                    post={post}
                    key={post._id}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [posts, setPosts] = useState([])

    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch("/api/prompt");
        const data = await response.json();

        setPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filterPrompts = (searchText) => {
        const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
        return posts.filter(
          (item) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
    
        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const clearInput = () => {
        setSearchText('');
    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);
    
        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    required
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search_input peer"
                    placeholder="Search for a tag or a username"
                />
                {searchText && (
                    <button
                    onClick={clearInput}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                    <XIcon className="h-5 w-5 text-gray-500" />
                    </button>
                )}
            </form>

            {searchText ? (
                <PromptCardList
                    data={searchedResults}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <PromptCardList
                    data={posts}
                    handleTagClick={handleTagClick}
                />
            )}
        </section>
    );
};

export default Feed;