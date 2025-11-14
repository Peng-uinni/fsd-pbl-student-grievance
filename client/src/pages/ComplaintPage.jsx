import { useParams } from "react-router-dom";

import ChatSection from "../components/ChatSection";
import { useEffect, useState } from "react";

export default function ComplaintPage(){
  const params = useParams();
  const { complaintId } = params; 

  const [complaint, setComplaint] = useState({});
  const [watchers, setWatchers] = useState([]);
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    const fetchComplaint = async () => {
      const endpoint = 'http://localhost:8080/api/complaint/'+complaintId;
      try{
        const res = await fetch(endpoint, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();
        
        if(res.ok && data.success){
          setComplaint(data.body);
          setWatchers(data.body.watchers);
          setAttachments(data.body.attachments);
        }
      }catch(err){
        console.error(err);
      }
    }

    fetchComplaint();
  }, [])

  // Helper function for status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 ring-yellow-500/20';
      case 'Resolved':
        return 'bg-green-100 text-green-800 ring-green-500/20';
      case 'Closed':
        return 'bg-red-100 text-red-800 ring-red-500/20';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 ring-blue-500/20';
      default:
        return 'bg-gray-100 text-gray-800 ring-gray-500/20';
    }
  };
   
  return (
    <div className="max-w-5xl mx-auto my-6 p-6 lg:p-8 bg-white shadow-2xl rounded-xl border border-gray-100">

      {/* --- Header Section (Subject & Status) --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 sm:mb-0 leading-tight">
          {complaint.subject}
        </h1>
        <span className={`px-4 py-1 text-xs sm:text-sm font-bold rounded-full uppercase ring-1 ${getStatusColor(complaint.status)}`}>
          {complaint.status}
        </span>
      </div>

      {/* Main Content: Metadata, Description, Attachments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1: Metadata */}
        <div className="lg:col-span-1 space-y-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-2">Details</h3>
          
          {[
            { label: 'Category', value: complaint.category },
            { label: 'Department', value: complaint.department },
            { label: 'Created At', value: new Date(complaint.createdAt).toLocaleDateString() },
            { label: 'Watchers', value: watchers.length},
          ].map((item, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-xs font-medium uppercase text-gray-500">{item.label}</span>
              <span className={`text-sm ${item.mono ? 'font-mono tracking-wider break-all' : ''} ${item.color || 'text-gray-700'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Column 2: Description & Attachments */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              Description
            </h3>
            <p className="text-gray-700 bg-white p-5 rounded-lg whitespace-pre-wrap border border-gray-200 shadow-sm leading-relaxed">
              {complaint.description}
            </p>
          </div>

          {/* Attachments */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              Attachments ({attachments.length})
            </h3>
            {attachments && attachments.length > 0 ? (
              <ul className="space-y-2 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                {ticket.attachments.map((attachment, index) => (
                  <li key={index} className="flex items-center text-sm font-medium text-blue-700 hover:text-blue-800 transition duration-150 cursor-pointer">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"></path></svg>
                    {attachment.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic bg-gray-50 p-3 rounded-lg border border-gray-200">
                No files were attached to this grievance
              </p>
            )}
          </div> 
        </div>
      </div>
      
      {/* --- Chat Section (Full Width) --- */}
      <ChatSection complaintId={complaintId} />
      
    </div>
  );
}