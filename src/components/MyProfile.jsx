import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MyProfile = () => {
    const { user } = useContext(AuthContext);

    // যদি ইউজার লোড না হয়ে থাকে বা নাল থাকে
    if (!user) {
        return <div className="text-center mt-20">Loading profile...</div>;
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            
            {/* Profile Card */}
            <div className="card w-full max-w-2xl bg-base-100 shadow-2xl overflow-hidden animate-fadeIn">
                
                {/* Header Banner */}
                <div className="h-40 bg-gradient-to-r from-cyan-500 to-blue-500 relative">
                    {/* আপনি চাইলে এখানে কভার ফটো দিতে পারেন, এখন শুধু কালার রাখা হয়েছে */}
                    <div className="absolute top-4 right-4 text-white/80 font-mono text-xs">
                        ID: {user.uid?.slice(0, 10)}...
                    </div>
                </div>

                {/* Profile Content */}
                <div className="px-6 pb-8 relative">
                    
                    {/* User Avatar (Overlapping Header) */}
                    <div className="relative -mt-16 mb-4 flex justify-center sm:justify-start">
                        <div className="avatar online">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white">
                                <img 
                                    src={user.photoURL || "https://i.ibb.co/0j2wK7W/user.png"} 
                                    alt="User Profile" 
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* User Info Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        
                        {/* Name & Email */}
                        <div className="text-center sm:text-left w-full">
                            <h2 className="text-3xl font-bold text-base-content">{user.displayName || "User Name"}</h2>
                            <p className="text-gray-500 font-medium">{user.email}</p>
                            
                            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                                <span className="badge badge-primary badge-outline px-3 py-1">Habit Hero Member</span>
                                {user.emailVerified ? (
                                    <span className="badge badge-success gap-1 text-white">
                                        Verified Email
                                    </span>
                                ) : (
                                    <span className="badge badge-warning gap-1">
                                        Unverified
                                    </span>
                                )}
                            </div>
                        </div>

                        
                        
                    </div>

                    <div className="divider my-6">Account Details</div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Info Card 1 */}
                        <div className="p-4 bg-base-200 rounded-xl flex items-center gap-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Member Since</p>
                                <p className="font-semibold text-base-content">
                                    {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toDateString() : "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Info Card 2 */}
                        <div className="p-4 bg-base-200 rounded-xl flex items-center gap-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Last Login</p>
                                <p className="font-semibold text-base-content">
                                    {user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toDateString() : "Just Now"}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;