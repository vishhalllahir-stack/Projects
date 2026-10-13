import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTeacher, getTeacher, updateTeacher } from "../services/teacherService";
import "../index.css";

const initial = { teacherId:"", firstName:"", lastName:"", email:"", phone:"", gender:"Male", dateOfBirth:"", address:"", city:"", state:"Gujarat", qualification:"", experience:0, department:"", subject:"", joiningDate:"", salary:0, status:"Active" };

export default function TeacherForm() {
  const { id } = useParams(); const navigate = useNavigate();
  const [form, setForm] = useState(initial); const [loading,setLoading]=useState(Boolean(id)); const [saving,setSaving]=useState(false); const [error,setError]=useState("");
  useEffect(()=>{ if(!id) return; getTeacher(id).then((r)=>setForm(r.data||r)).catch((e)=>setError(e.response?.data?.message||"Failed to load teacher")).finally(()=>setLoading(false)); },[id]);
  const change=(e)=>setForm({...form,[e.target.name]:e.target.value});
  const submit=async(e)=>{e.preventDefault();setSaving(true);setError("");try{const payload={...form,experience:Number(form.experience),salary:Number(form.salary)}; if(id) await updateTeacher(id,payload); else await createTeacher(payload); navigate("/teachers");}catch(e){setError(e.response?.data?.message||"Failed to save teacher");}finally{setSaving(false);}};
  if(loading) return <div className="loading">Loading teacher...</div>;
  return <section className="form-page"><div className="page-header"><div><p className="page-eyebrow">People</p><h1>{id?"Edit Teacher":"Add Teacher"}</h1></div></div>{error&&<div className="error-message">{error}</div>}<form className="data-card form-grid" onSubmit={submit}>{Object.entries({teacherId:"Teacher ID",firstName:"First Name",lastName:"Last Name",email:"Email",phone:"Phone",qualification:"Qualification",experience:"Experience (years)",department:"Department",subject:"Subject",city:"City",salary:"Salary"}).map(([name,label])=><label key={name}>{label}<input name={name} type={name==="email"?"email":name==="experience"||name==="salary"?"number":"text"} value={form[name]??""} onChange={change} required={!["city","salary"].includes(name)} /></label>)}<label>Gender<select name="gender" value={form.gender} onChange={change}><option>Male</option><option>Female</option><option>Other</option></select></label><label>Status<select name="status" value={form.status} onChange={change}><option>Active</option><option>Inactive</option></select></label><label className="form-grid-full">Address<textarea name="address" value={form.address} onChange={change}/></label><div className="form-actions form-grid-full"><button type="button" className="clear-button" onClick={()=>navigate("/teachers")}>Cancel</button><button className="add-button" disabled={saving}>{saving?"Saving...":id?"Update Teacher":"Create Teacher"}</button></div></form></section>;
}
