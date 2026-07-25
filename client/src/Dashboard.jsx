import { useState } from "react";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    github: "",
    linkedin: "",
    college: "",
    course: "",
    year: "",
    cgpa: "",
  });

  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([
    "React",
    "Node.js",
    "MongoDB",
    "Python",
  ]);

  const [project, setProject] = useState({
    title: "",
    description: "",
    github: "",
    live: "",
  });

  const [projects, setProjects] = useState([]);
  const [githubData, setGithubData] = useState(null);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      const text = await response.text();
      alert(text);
    } catch (error) {
      alert(error.message);
    }
  };
 const fetchGithub = async () => {
  try {
    console.log("GitHub Username:", profile.github);

    const response = await fetch(
      `https://api.github.com/users/${profile.github}`
    );

    const data = await response.json();
    console.log(data);
    console.log("Status:", response.status);
    console.log("GitHub Data:", data);
    if (data.message === "Not Found") {
    alert("GitHub username not found");
  return;
}

   

    setGithubData(data);

  } catch (error) {
    console.log(error);
  }
};

  const addProject = () => {

    

    setProjects([...projects, project]);

    setProject({
      title: "",
      description: "",
      github: "",
      live: "",
    });
  };

  return (
    <div className={darkMode ? "dashboard dark" : "dashboard"}>
      <button onClick={() => setDarkMode(!darkMode)}>
        🌙 Dark Mode
      </button>

      <h1>Welcome, Prachi 👋</h1>

      <div className="box">
        <h2>Create Profile</h2>

        <input
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <input
          name="bio"
          placeholder="Enter Bio"
          onChange={handleChange}
        />

        
       <input
  name="github"
  placeholder="GitHub Username"
  value={profile.github}
  onChange={handleChange}
/> 

        <input
          name="linkedin"
          placeholder="LinkedIn Link"
          onChange={handleChange}
        />

        <input
          name="college"
          placeholder="College"
          onChange={handleChange}
        />

        <input
          name="course"
          placeholder="Course"
          onChange={handleChange}
        />

        <input
          name="year"
          placeholder="Year"
          onChange={handleChange}
        />

        <input
          name="cgpa"
          placeholder="CGPA"
          onChange={handleChange}
        />

        <button onClick={saveProfile}>
          Save Profile
        </button>
        <button onClick={fetchGithub}>
  Load GitHub Profile
</button>
      </div>

      <div className="box">
        <h2>Skills</h2>

        <input
          placeholder="Add Skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <button
          onClick={() => {
            if (skill.trim() === "") return;
            setSkills([...skills, skill]);
            setSkill("");
          }}
        >
          Add Skill
        </button>

        <ul>
          {skills.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      {githubData && (
  <div className="box">
    <h2>GitHub Profile</h2>

    <img
      src={githubData.avatar_url}
      alt="GitHub"
      width="120"
    />

    <h3>{githubData.name}</h3>

    <p>Username: {githubData.login}</p>

    <p>Repositories: {githubData.public_repos}</p>

    <p>Followers: {githubData.followers}</p>

    <p>Following: {githubData.following}</p>

    <a
      href={githubData.html_url}
      target="_blank"
      rel="noreferrer"
    >
      View GitHub
    </a>
  </div>
)}

      <div className="box">
        <h2>Projects</h2>

        <input
          placeholder="Project Title"
          value={project.title}
          onChange={(e) =>
            setProject({ ...project, title: e.target.value })
          }
        />

        <input
          placeholder="Description"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
        />

        <input
          placeholder="GitHub Link"
          value={project.github}
          onChange={(e) =>
            setProject({ ...project, github: e.target.value })
          }
        />

        <input
          placeholder="Live Link"
          value={project.live}
          onChange={(e) =>
            setProject({ ...project, live: e.target.value })
          }
        />

        <button onClick={addProject}>
          Add Project
        </button>

        {projects.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.github}</p>
            <p>{item.live}</p>

            <button onClick={() => setProject(item)}>
              Edit
            </button>

            <button
              onClick={() =>
                setProjects(
                  projects.filter((_, i) => i !== index)
                )
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;