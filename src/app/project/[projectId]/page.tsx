import { getDehydratedQuery, Hydrate } from '@/hooks/react-query/react-query';
import ProjectQueryOptions from '@/service/project/queries';
import { redirect } from 'next/navigation';

import SImage from '@/components/common/Image';
import RouterPush from '@/components/custom/RouterPush';
import SwiperComponent from '@/components/common/Swiper';

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
        <SwiperComponent items={sampleImageComponent} />
      </Hydrate>
    </div>
  );
};

export default ProjectDetailPage;
