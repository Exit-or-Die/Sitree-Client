'use client';

import ProjectQueryOptions from '@/service/project/queries';
import { SitreePickResponse } from '@/service/project/response';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useRef, useEffect } from 'react';
import { Nullable } from 'types/common';

import SImage from '../common/Image';

const SitreePick = () => {
  const { queryKey, queryFn } = ProjectQueryOptions.retrieveSitreePick();
  const { data = [] } = useQuery<Array<SitreePickResponse>>({ queryKey, queryFn });
  const [selectedProject, setSelectedProject] = useState<Nullable<SitreePickResponse>>(null);
  const selectedRef = useRef(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      setSelectedProject(data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (selectedRef.current) {
      setPosition(selectedRef.current.offsetTop);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (data.length > 1) {
      const interval = setInterval(() => {
        setSelectedProject((prev) => {
          const currentIndex = data.findIndex((p) => p.projectId === prev?.projectId);
          const nextIndex = (currentIndex + 1) % data.length;

          return data[nextIndex];
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [data]);

  return (
    <div className="flex-1 p-6 w-[954px]">
      <h2 className="text-xlarge font-bold mb-4">사이트리 PICK</h2>
      <div className="flex shadow-lg border rounded-3xl h-[396px]">
        <div className="relative w-1/3 py-2 pl-2 bg-white-100 rounded-l-3xl">
          <div
            className="absolute left-2 w-[95%] h-[75px] border bg-white-100 rounded-lg shadow-md transition-all duration-300"
            style={{ top: `${position}px` }}
          />
          <ul className="flex-1 flex flex-col justify-between h-full">
            {data.map((project) => (
              <li
                key={project.projectId}
                ref={
                  !selectedProject
                    ? null
                    : selectedProject.projectId === project.projectId
                      ? selectedRef
                      : null
                }
                className="relative flex items-center p-3 cursor-pointer rounded-lg transition"
                onClick={() => setSelectedProject(project)}
              >
                <div className="w-[52px] h-[52px] rounded-xlarge overflow-hidden">
                  <SImage
                    src={project.thumbnail}
                    alt={`${project.name} Icon`}
                    width={52}
                    height={52}
                  />
                </div>
                <div className="ml-4 flex flex-col h-[80%] justify-evenly">
                  <span className="text-base font-bd truncate">{project.name}</span>
                  <span className="text-xsmall text-gray-400 flex gap-2">
                    <div className="flex items-center">
                      <SImage
                        src="/comment.svg"
                        width={12}
                        height={12}
                        alt="comment"
                        className="mr-[3px]"
                      />{' '}
                      <span className="text-slate-30">{project.commentCount}</span>
                    </div>
                    <div className="flex items-center">
                      <SImage
                        src="/like.svg"
                        width={12}
                        height={12}
                        alt="like"
                        className="mr-[3px]"
                      />
                      <span className="text-slate-30">{project.likesCount}</span>
                    </div>
                    <span className="text-slate-50">조회수 {project.viewCount}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 flex items-center justify-center relative">
          <SImage
            src={!selectedProject ? data[0].backgroundImage : selectedProject.backgroundImage}
            alt={`Project ${!selectedProject ? data[0].name : selectedProject.name} Background`}
            className="rounded-r-3xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SitreePick;
