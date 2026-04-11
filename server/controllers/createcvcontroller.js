const Createcv=async(req,res)=>{
    const{name,email,phonenumber,company,address}=req.body;
    console.log("email from frontentd is ",name);
    try {
        const response=await fetch("https://useresume.ai/api/v3/resume/create",{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${process.env.USERESUME_APIKEY}`,
                "Content-Type":"application/json"
            },
             body: JSON.stringify({
        content: {
            name: `${name}`,
            role: "Software Engineer",
            email: `${email}`,
            phone: `${phonenumber}`,
            address: `${address}`,
            summary: "Experienced software engineer with 5+ years building scalable web applications.",
            employment: [
                {
                    title: "Senior Software Engineer",
                    company: `${company}`,
                    present: true
                }
            ],
            skills: [
                {
                    name: "JavaScript",
                    proficiency: "Expert",
                    display_proficiency: true
                },
                {
                    name: "React",
                    proficiency: "Advanced",
                    display_proficiency: true
                },
                {
                    name: "Node js",
                    proficiency: "Advanced",
                    display_proficiency: true
                },
                {
                    name: "Express js",
                    proficiency: "Advanced",
                    display_proficiency: true
                },
                {
                    name: "Mongodb",
                    proficiency: "Advanced",
                    display_proficiency: true
                },
                {
                    name: "C++",
                    proficiency: "Advanced",
                    display_proficiency: true
                }
            ]
        },
        style: {
            template: "default",
            template_color: "blue",
            font: "inter",
            page_padding: 1.54,
            page_format: "a4",
            date_format: "LLL yyyy",
            background_color: "white",
            profile_picture_radius: "rounded-full"
        }
    })

  });
  const result=await response.json();
  res.json({status:true,ans:result});
        
    } catch (error) {
        console.log("maker error",error);
        res.json({status:false,ans:"Resume Creation Failed"});
        
    }

}
export {Createcv};