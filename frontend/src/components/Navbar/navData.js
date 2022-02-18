import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
export const links = [
  {
    id: 1,
    url: '/',
    text: 'about ME',
  },
  {
    id: 2,
    url: '/projects',
    text: 'My Projects',
  },
  {
    id: 3,
    url: '/contact',
    text: 'Hire ME',
  }

]

export const social = [
  {
    id: 1,
    url: 'https://github.com/KrishnaA01',
    icon: <FaGithub size={32} />,
  },
  {
    id: 2,
    url: 'https://www.linkedin.com/in/krishna-mahato-web-dev/',
    icon: <FaLinkedin size={32} />,
  },
  {
    id: 3,
    url: 'https://twitter.com/home',
    icon: <FaTwitter size={32} />,
  }
 
]