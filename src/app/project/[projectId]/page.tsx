import { getDehydratedQuery, Hydrate } from '@/hooks/react-query/react-query';
import ProjectQueryOptions from '@/service/project/queries';
import { redirect } from 'next/navigation';

import CommentComponent from '@/components/comment';
import SImage from '@/components/common/Image';
import SwiperComponent from '@/components/common/Swiper';
import RouterPush from '@/components/custom/RouterPush';
import ProjectDetail from '@/components/project/detail/ProjectDetail';

interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { projectId } = params;

  const { queryKey, queryFn } = ProjectQueryOptions.retrieveProjectDetail(projectId);

  const query = await getDehydratedQuery({ queryKey, queryFn });

  const data = query.state.data;

  const sampleImages = new Array(10).fill('https://picsum.photos/600/400');

  const sampleImageComponent = sampleImages.map((src, index) => (
    <SImage key={index} src={src} width={400} height={30} alt={`Slide ${index + 1}`} />
  ));

  if (!query) {
    redirect('/404');
  }

  return (
    <div className="px-20 pt-10 pb-20 bg-slate-95">
      <Hydrate state={{ queries: [query] }}>
        <RouterPush className="px-2 py-1.5 flex items-center gap-1 cursor-pointer" path="/">
          <SImage src="/leftArrow.svg" width={14} height={14} />
          <p className="text-small text-slate-30">프로젝트 목록</p>
        </RouterPush>
        <div className="py-5">
          <SwiperComponent items={sampleImageComponent} />
        </div>
        <div className="mt-8 flex justify-center gap-5">
          <div className="w-[94.2rem]">
            <ProjectDetail />
          </div>
          <CommentComponent />
          <div className="w-[30.6rem] sticky top-5 self-start border border-red-100"></div>
        </div>
      </Hydrate>
    </div>
  );
};

export default ProjectDetailPage;
