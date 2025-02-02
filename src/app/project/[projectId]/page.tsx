import { getDehydratedQuery, Hydrate } from '@/hooks/react-query/react-query';
import CommentsQueryOptions from '@/service/comments/queries';
import ProjectQueryOptions from '@/service/project/queries';
import { redirect } from 'next/navigation';

import SImage from '@/components/common/Image';
import SwiperComponent from '@/components/common/Swiper';
import RouterPush from '@/components/custom/RouterPush';
import CommentComponent from '@/components/project/comment';
import ProjectDetail from '@/components/project/detail/ProjectDetail';

interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { projectId } = params;

  const { queryKey: projectDetailKey, queryFn: projectDetailFn } =
    ProjectQueryOptions.retrieveProjectDetail(projectId);
  const { queryKey: projectCommentKey, queryFn: projectCommentFn } =
    CommentsQueryOptions.retrieveCommentList(projectId, 0, 10);

  const projectDetailQuery = await getDehydratedQuery({
    queryKey: projectDetailKey,
    queryFn: projectDetailFn
  });
  const projectCommentQuery = await getDehydratedQuery({
    queryKey: projectCommentKey,
    queryFn: projectCommentFn
  });

  const projectDetail = projectDetailQuery.state.data;
  const projectComment = projectCommentQuery.state.data;

  const sampleImages = new Array(10).fill('https://picsum.photos/600/400');

  const sampleImageComponent = sampleImages.map((src, index) => (
    <SImage key={index} src={src} width={400} height={30} alt={`Slide ${index + 1}`} />
  ));

  if (!projectDetailQuery) {
    redirect('/404');
  }

  return (
    <div className="px-20 pt-10 pb-20 bg-slate-95">
      <Hydrate state={{ queries: [projectDetailQuery] }}>
        <RouterPush className="px-2 py-1.5 flex items-center gap-1 cursor-pointer" path="/">
          <SImage src="/leftArrow.svg" width={14} height={14} />
          <p className="text-small text-slate-30">프로젝트 목록</p>
        </RouterPush>
        <div className="py-5">
          <SwiperComponent items={sampleImageComponent} />
        </div>
        <div className="mt-8 flex justify-center gap-5">
          <div className="w-[94.2rem] flex flex-col gap-10">
            <ProjectDetail detail={projectDetail} />
            <CommentComponent commentInfo={projectComment} />
          </div>
          <div className="w-[30.6rem] sticky top-5 self-start border border-red-100"></div>
        </div>
      </Hydrate>
    </div>
  );
};

export default ProjectDetailPage;
