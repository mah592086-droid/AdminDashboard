import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlusIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import AddMemberModal from '../components/AddMemberModal';

const initialTeamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Frontend Developer',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    status: 'online',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Backend Developer',
    email: 'jane@example.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    status: 'away',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'UI/UX Designer',
    email: 'mike@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    status: 'online',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    role: 'Product Manager',
    email: 'sarah@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    status: 'offline',
  },
];

export default function TeamBoard() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMember = (newMember) => {
    setTeamMembers([...teamMembers, newMember]);
  };
  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Board</h1>
                <p className="text-gray-600 dark:text-gray-300">Manage your team members and their information</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
          >
            <UserPlusIcon className="h-5 w-5" />
            <span>Add Member</span>
          </motion.button>
        </div>


        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    member.status === 'online' ? 'bg-green-500' :
                    member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{member.role}</p>
                    </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <PhoneIcon className="h-4 w-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{member.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Status</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    member.status === 'online' ? 'bg-green-100 text-green-800' :
                    member.status === 'away' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Member Modal */}
        <AddMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddMember={handleAddMember}
        />
      </motion.div>
    </div>
  );
}
