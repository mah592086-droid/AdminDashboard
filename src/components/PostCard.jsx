import { motion } from 'framer-motion';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon, TagIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function PostCard({ post, onToggleLike, onOpenComments, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="relative bg-white/90 dark:bg-gray-900/70 rounded-2xl shadow-xl border border-gray-200/70 dark:border-gray-700/70 backdrop-blur-xl overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            className="h-10 w-10 rounded-xl object-cover ring-2 ring-white/70 dark:ring-gray-800/70 shadow"
            alt={post.author.name}
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{post.author.name} {post.author.handle && <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{post.author.handle}</span>}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{post.createdAt}</p>
          </div>
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(post.id)}
              className="p-2 rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 dark:text-rose-400 transition-colors"
              title="Delete post"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="mt-4 text-gray-800 dark:text-gray-100 leading-relaxed">{post.content}</p>

        {post.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-electric-100 dark:bg-electric-900 text-electric-700 dark:text-electric-300">
                <TagIcon className="h-3 w-3" />
                {t}
              </span>
            ))}
          </div>
        )}

        {post.media && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            src={post.media}
            alt="post media"
            className="mt-4 w-full rounded-xl object-cover max-h-[520px] shadow"
          />
        )}

        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={onToggleLike}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              post.liked
                ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            <HeartIcon className={`h-5 w-5 ${post.liked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button
            onClick={onOpenComments}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800">
            <ShareIcon className="h-5 w-5" />
            <span className="text-sm">{post.shares}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}


