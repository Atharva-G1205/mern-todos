import { useEffect, useState } from 'react';
import {Link, useNavigate, useParams } from 'react-router'
import toast, {LoaderIcon} from 'react-hot-toast';
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import 'ldrs/ring'

import api from '../lib/axios';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {
	const [note, setNote] = useState(null);

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const navigate = useNavigate();

	const {id} = useParams();

	useEffect(() => {
		const fetchNote = async () => {
			try {
				const res = await api.get(`/notes/${id}`);
				setNote(res.data);
			} catch (error) {
				toast.error("Failed to get the note");
				console.log("Error in fetching note:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchNote();
	}, [id])

	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete this note?")) return;

		try {
			await api.delete(`/notes/${id}`)
			toast.success("Note deleted");
			navigate('/');
		} catch (error) {
			console.log("error deleting note:", error);
			toast.dismiss();
			toast.error("Failed to delete note");
		} 
	};

	const handleSave = async () => {

		if (!note.title.trim() || !note.content.trim()) {
			toast.dismiss();
			toast.error("Please add a title or content");
			return;
		}

		setSaving(true);

		try {
			await api.put(`/notes/${id}`, note);
			toast.success('Note updated');
			navigate('/');
		} catch (error) {
			console.log("error updating note:", error);
			toast.error("Failed to update note");
		} finally {
			setSaving(false);
		}
	}

	if (loading) {
		return <div className='min-h-screen bg-base-200 flex items-center justify-center'>
			<Ring size="44" stroke="4" bgOpacity="0" speed="1.5" color="white" />
		</div>
	}

	return (
		<div className='min-h-screen bg-base-200'>
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<div className='flex items-center justify-between mb-6'>
						<Link to="/" className="btn btn-ghost">
							<ArrowLeftIcon className='h-5 w-5'/>
							Back to notes
						</Link>
						<button onClick={handleDelete} className='btn btn-error btn-outline'>
							<Trash2Icon className='h-5 w-5'/>
							Delete note
						</button>
					</div>

					<div className='card bg-base-100'>
						<div className="card-body">
							<div className="form-control mb-4">
								<label className='label'>
									<span className='label-text'>Title</span>
								</label>
								<input 
									type='text'
									placeholder='Note Title..'
									className="input input-bordered  focus:outline-none focus:ring-0 focus:border-primary transition duration-300"
									value={note.title}
									onChange={(e) => setNote({...note, title: e.target.value})}
								/>
							</div>
							
							<div className="form-control mb-4">
								<label>
									<span></span>
								</label>
								<textarea
									placeholder='Write your note here...'
									className='textarea textarea-bordered focus:ring-0 focus:border-primary focus:outline-none transition duration-300 text-[16px] h-32'
									value={note.content}
									onChange={(e) => setNote({...note, content: e.target.value})}
								/>
							</div>

							<div className="card-actions justify-end">
								<button className='btn btn-primary' disabled={saving} onClick={handleSave}>
									{saving ? "Saving..." : "Save changes"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NoteDetailPage