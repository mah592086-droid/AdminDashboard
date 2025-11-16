import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import PostCard from '../components/PostCard';
import CommentModal from '../components/CommentModal';

const initialPosts = [
  {
    id: 'p1',
    author: {
      name: 'Ava Johnson',
      handle: '@ava',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face'
    },
    createdAt: '2m',
    content: 'Loving the new SocialPulse animations! 🚀✨',
    media: null,
    likes: 128,
    comments: 14,
    shares: 9,
    liked: false,
    tags: ['#motion', '#ui', '#react']
  },
  {
    id: 'p2',
    author: {
      name: 'Marco Silva',
      handle: '@marco',
      avatar: 'https://images.unsplash.com/photo-1546456073-6712f79251bb?w=80&h=80&fit=crop&crop=face'
    },
    createdAt: '1h',
    content: 'Creator spotlight: behind the scenes of our latest campaign.',
    media: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=80',
    likes: 892,
    comments: 102,
    shares: 58,
    liked: true,
    tags: ['#creator', '#bts', '#campaign']
  },
  {
    id: 'p3',
    author: {
      name: 'Zara Ahmed',
      handle: '@zara',
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=80&h=80&fit=crop&crop=face'
    },
    createdAt: '3h',
    content: 'Tips for elevating your brand visuals in 2025. Color, motion, micro-interactions.',
    media: null,
    likes: 312,
    comments: 22,
    shares: 40,
    liked: false,
    tags: ['#brand', '#design', '#2025']
  },
  {
    id: 'p4',
    author: {
      name: 'Noah Kim',
      handle: '@noah',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=face'
    },
    createdAt: '5h',
    content: 'Weekly recap: 1.2M impressions, 5.9% ER. Keep pushing! 💪',
    media: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80',
    likes: 1450,
    comments: 310,
    shares: 110,
    liked: false,
    tags: ['#analytics', '#growth']
  }
];

export default function Feed() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [activePostForComments, setActivePostForComments] = useState(null);

  const handleCreatePost = () => {
    if (!newPostText.trim() && !newPostImage.trim()) return;
    const newPost = {
      id: `p${Date.now()}`,
      author: {
        name: 'You',
        handle: '@you',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
      },
      createdAt: 'now',
      content: newPostText,
      media: newPostImage || null,
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      tags: []
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
    setNewPostImage('');
  };

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1
            }
          : p
      )
    );
  };
  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <div className="bg-white/90 dark:bg-gray-900/70 rounded-2xl shadow-xl border border-gray-200/70 dark:border-gray-700/70 backdrop-blur-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200/70 dark:border-gray-700/70">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Create Post</h2>
          </div>
          <div className="p-5 space-y-4">
            <textarea
              className="w-full min-h-24 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-500"
              placeholder="What's happening?"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="Optional image URL"
                  className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm"
                  value={newPostImage}
                  onChange={(e) => setNewPostImage(e.target.value)}
                />
              </div>
              <button
                onClick={handleCreatePost}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-electric-600 to-indigo-600 hover:from-electric-500 hover:to-indigo-500 text-white font-medium transition-colors shadow-md shadow-electric-600/30"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
                Post
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onToggleLike={() => toggleLike(post.id)}
                onOpenComments={() => setActivePostForComments(post)}
                onDelete={deletePost}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <CommentModal
        open={!!activePostForComments}
        post={activePostForComments}
        onClose={() => setActivePostForComments(null)}
      />
    </div>
  );
}

