import{r as n,u as m,g as o,j as e,C as x,a as t,f as u,p as i,b}from"./index-DFbhc9PT.js";function C(){const[c,r]=n.useState([]),{user:a}=m();n.useEffect(()=>{o(a).then(s=>{console.log("joined up classes",s.data.classes),r(s.data.classes)}).catch(s=>{console.log("The data was not returned",s)})},[a]);const d=s=>{b(a,s).then(()=>{r(c.filter(l=>l.class_id!==s))}).catch(l=>{console.error("Error removing class.",l)})};return e.jsx(h,{children:c.map(s=>e.jsx(x,{xs:12,sm:6,md:4,lg:3,className:" mt-4",children:e.jsx(t,{className:"ms-3",children:e.jsxs(t.Body,{className:"m-1",children:[e.jsx(t.Title,{children:s.class_type}),e.jsx(t.Subtitle,{className:"mb-2 text-muted",children:s.class_name}),e.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Instructor: ",s.instructor_name]}),e.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Price: $",s.price]}),e.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Date & Time: ",u(s.start_time)]}),e.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Duration: ",s.duration]}),e.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Intensity Level: ",s.intensity]}),e.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Location: ",s.location]}),e.jsxs(t.Subtitle,{className:"mb-2 text-muted",children:["Max # of attendies: ",s.class_capacity]}),e.jsxs(t.Subtitle,{className:"mb-4 text-muted",children:["Current # of attendies: ",s.class_size]}),e.jsx(p,{onClick:()=>d(s.class_id),children:"Remove Class"})]})})},s.id))})}const h=i.div`
display: flex;
flex-wrap: wrap;
`,p=i.button`
  background-color: #dc3545;
  color: white;
  padding: 5px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;export{C as InstructorJoinedClasses};
