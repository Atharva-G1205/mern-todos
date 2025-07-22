import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import toast from 'react-hot-toast'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'

const NoteCard = ({note, setNotes}) => {

    const handleDelete = async (e, id) => {
        // since the entire card is a link to that note's route, we prevent the default behaviour of the component ie redirecting to that route.
        e.preventDefault();

        if (!window.confirm("Are you sure you want to delete this note?")) return;
        
        try {
            await api.delete(`/notes/${id}`);
            setNotes(prev => prev.filter(note => note._id !== id ))
            toast.success('Note deleted');
        } catch (error) {
            toast.dismiss();
            toast.error('Failed to delete note');
            console.log("Error deleting note:", error);
        } 
    }

    return (
        <Link to={`/note/${note._id}`}
        className='card bg-base-300 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#777cef]'>
            <div className='card-body'>
                <h3 className='card-title text-base-content'>{note.title}</h3>
                <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm text-base-content/60'>
                        {formatDate(note.createdAt)}
                    </span>
                    <div className='flex items-center gap-1'>
                        <PenSquareIcon className='size-4' />
                        <button 
                            className='btn btn-ghost btn-xs text-error'
                            onClick={(e) => handleDelete(e, note._id)}>
                            <Trash2Icon className="size-4"/>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard 