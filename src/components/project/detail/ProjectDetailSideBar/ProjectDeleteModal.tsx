'use client';

import ProjectQueryOptions from '@/service/project/queries';
import { useMutation } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import SButton from '@/components/common/Button';

interface ProjectDeleteModalProps {
  projectId: string;
  handleClose: () => void;
}

const ProjectDeleteModal = ({ projectId, handleClose }: ProjectDeleteModalProps) => {
  const { mutate: deleteProject } = useMutation({
    mutationFn: () => {
      const { mutateFn } = ProjectQueryOptions.deleteProject(projectId);

      return mutateFn();
    },
    onSuccess: () => {
      handleClose();
      redirect('/');
    }
  });

  return (
    <div className="w-[36rem] bg-white-100 p-6 rounded-[2.4rem] text-small text-start">
      <div className="text-large font-lg leading-6">프로젝트를 삭제하시겠어요?</div>
      <div className="py-4 text-slate-50">
        <p>한 번 삭제한 프로젝트는 되돌릴 수 없어요.</p>
        <p>프로젝트를 함께한 팀원과 논의 후 결정해 주세요.</p>
      </div>
      <div className="pt-4 flex justify-end gap-2">
        <SButton className="border-none bg-slate-95" onClick={handleClose}>
          아니요
        </SButton>
        <SButton onClick={deleteProject} className="border-none bg-red-50 text-white-100">
          삭제하기
        </SButton>
      </div>
    </div>
  );
};

export default ProjectDeleteModal;
