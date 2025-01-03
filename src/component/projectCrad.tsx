import React from 'react';
import { BiLogoGithub } from 'react-icons/bi';
import { MdLink } from 'react-icons/md';
import { Link} from 'react-router';

interface ProjectCardProps {
  name: string;
  description: string;
  built_with: string[];
  Theme: string;
  Live_link:string;
  Github_link:string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, built_with, Theme, Live_link, Github_link }) => {
  return (
    <section className={`${Theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-4 m-2 rounded-lg shadow-lg`}>
      <h3 className='font-bold text-2xl border-b-4 border-b-blue-600'>{name}</h3>
      <p className='max-w-lg break-words'>{description}</p>
      <div className='flex gap-2 flex-wrap'>
        <p className='mt-5'>Built With the following Technologies:</p>
        {built_with.map((res, index) => (
          <p key={index} className={res === 'React' || res === 'HTML' ? 'text-blue-600' : res === 'CSS' || res === 'Tailwind CSS' ? 'text-purple-500' : res==='Node.js' || res==='MongoDB' ? "text-green-600": res==='JavaScript' ? 'text-yellow-500':'text-red-500'}>{res}</p>
        ))}
      </div>
      <div className='flex gap-2'>
        <Link to={Live_link}>
            <MdLink size={30}/>
        </Link>
        <Link to={Github_link}>
            <BiLogoGithub size={30}/>
        </Link>
      </div>
    </section>
  );
};
