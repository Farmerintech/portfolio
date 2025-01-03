import { useContext } from 'react';
import { Aside } from '../component/aside';
import { Header } from '../component/header';
import { ProjectCard } from '../component/projectCrad';
import { projectData } from '../data/projectdata';
import { ThemeContext } from '../context/themeContext';
import { Link } from 'react-router';

export const Projects = () => {
  const { Theme } = useContext(ThemeContext);

  return (
    <section className={`${Theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} w-full min-h-screen flex flex-col`}>
      <Header />
      <div className="bg-white flex">
        <Aside />
      </div>
      <div className="md:left-[300px] lg:left-[280px] left-[20%] top-[15%] z-2 mt-10 absolute">
        <section className="flex flex-col md:flex-row md:flex-wrap justify-start items-center">
          {projectData.map((project, index) => (
            <div key={index} className="w-full md:w-1/2 p-2">
              <ProjectCard name={project.name} description={project.Description} 
              built_with={project.Built_with} Theme={Theme} Live_link={project.project_link} Github_link={project.github_rep_link}/>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};
