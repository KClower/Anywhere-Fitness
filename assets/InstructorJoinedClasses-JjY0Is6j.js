import{r as n,u as o,a as r,j as s,C as x,b as t,f as u,p as d}from"./index-CxzDVS05.js";function j(){const[c,i]=n.useState([]),{user:a}=o();n.useEffect(()=>{r.get(`http://localhost:9000/api/client/classes/${a}`).then(e=>{console.log("joined up classes",e.data.classes),i(e.data.classes)}).catch(e=>{console.log("The data was not returned",e)})},[a]);const m=e=>{r.delete("http://localhost:9000/api/client/class",{data:{clientId:a,classId:e}}).then(()=>{i(c.filter(l=>l.class_id!==e))}).catch(l=>{console.error("Error removing class.",l)})};return s.jsx(h,{children:c.map(e=>s.jsx(x,{xs:12,sm:6,md:4,lg:3,className:" mt-4",children:s.jsx(t,{className:"ms-3",children:s.jsxs(t.Body,{className:"m-1",children:[s.jsx(t.Title,{children:e.class_type}),s.jsx(t.Subtitle,{className:"mb-2 text-muted",children:e.class_name}),s.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Instructor: ",e.instructor_name]}),s.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Price: $",e.price]}),s.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Date & Time: ",u(e.start_time)]}),s.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Duration: ",e.duration]}),s.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Intensity Level: ",e.intensity]}),s.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Location: ",e.location]}),s.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Max # of attendies: ",e.class_capacity]}),s.jsxs(t.Subtitle,{className:"mb-4 text-muted",children:["Current # of attendies: ",e.class_size]}),s.jsx(p,{onClick:()=>m(e.class_id),children:"Remove Class"})]})})},e.id))})}const h=d.div`
display: flex;
flex-wrap: wrap;
`,p=d.button`
  background-color: #dc3545;
  color: white;
  padding: 5px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;export{j as InstructorJoinedClasses};
