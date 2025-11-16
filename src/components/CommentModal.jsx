import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function CommentModal({ open, post, onClose }) {
  const [text, setText] = useState('');
  const [comments, setComments] = useState([
    { id: 'c1', author: 'Emily', content: 'So cool! 🔥', createdAt: '1m' },
    { id: 'c2', author: 'Tom', content: 'Congrats team!', createdAt: '5m' },
  ]);

  const addComment = () => {
    if (!text.trim()) return;
    setComments([{ id: `c${Date.now()}`, author: 'You', content: text, createdAt: 'now' }, ...comments]);
    setText('');
  };
  const deleteComment = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end sm:items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white dark:bg-gray-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={onClose}
                  className="absolute right-3 top-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-500" />
                </button>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-left sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100">
                      Comments
                    </Dialog.Title>
                    <div className="mt-2">
                      {post && (
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-4">
                          <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-3">{post.content}</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="flex-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
                          placeholder="Write a comment…"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        />
                        <button
                          onClick={addComment}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-electric-600 hover:bg-electric-700 text-white text-sm"
                        >
                          <PaperAirplaneIcon className="h-4 w-4" />
                          Send
                        </button>
                      </div>
                      <div className="mt-4 space-y-3 max-h-80 overflow-y-auto">
                        {comments.map((c, i) => (
                          <motion.div
                            key={c.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.04 }}
                            className="p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{c.author}</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{c.content}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">{c.createdAt}</span>
                                <button
                                  onClick={() => deleteComment(c.id)}
                                  className="p-2 rounded-md hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 dark:text-rose-400"
                                  title="Delete comment"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}


