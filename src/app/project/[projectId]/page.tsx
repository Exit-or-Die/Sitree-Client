import { getDehydratedQueries, getDehydratedQuery, Hydrate } from '@/hooks/react-query/react-query';
import CommentsQueryOptions from '@/service/comments/queries';
import { GetCommentListResponse } from '@/service/comments/response';
import ProjectQueryOptions from '@/service/project/queries';
import { IMAGE_TYPE, ProjectDetailResponse } from '@/service/project/response';
import { redirect } from 'next/navigation';

import SImage from '@/components/common/Image';
import SwiperComponent from '@/components/common/Swiper';
import RouterPush from '@/components/custom/RouterPush';
import CommentComponent from '@/components/project/comment';
import ProjectDetail from '@/components/project/detail/ProjectDetail';
import ProjectDetailSideBar from '@/components/project/detail/ProjectDetailSideBar';

interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { queryKey: projectDetailKey, queryFn: projectDetailFn } =
    ProjectQueryOptions.retrieveProjectDetail(params.projectId);

  const projectDetailQuery = await getDehydratedQuery({
    queryKey: projectDetailKey,
    queryFn: projectDetailFn
  });

  const projectDetail = projectDetailQuery?.state.data as ProjectDetailResponse;

  if (!projectDetail) {
    return {
      title: '프로젝트를 찾을 수 없습니다',
      description: '요청한 프로젝트를 찾을 수 없습니다.',
      icons: {
        icon: '/meta/sitree_favicon.ico'
      },
      images: [
        {
          url: '/meta/sitree_image.png',
          width: 800,
          height: 600,
          alt: 'Sitree default image'
        }
      ]
    };
  }

  const projectRepresentativeImage = projectDetail.overview.images.find(
    (image) => image.imageType === IMAGE_TYPE.REPRESENT
  );

  return {
    title: projectDetail.head?.title,
    description: projectDetail.head?.shortDescription,
    icons: {
      icon: projectDetail.head?.thumbnailImageUrl
    },
    openGraph: {
      title: projectDetail.head?.title,
      description: projectDetail.head?.shortDescription,
      type: 'website',
      url: `https://si-tree.com/projects/${params.projectId}`,
      site_name: 'Si-Tree',
      locale: 'ko_KR',
      images: [
        {
          url: projectRepresentativeImage?.imageUrl || '/meta/sitree_image.png',
          width: 800,
          height: 600,
          alt: projectDetail.head?.title
        },
        ...projectDetail.overview.images.map((image) => ({
          url: image.imageUrl,
          width: 800,
          height: 600,
          alt: projectDetail.head?.title
        }))
      ]
    }
  };
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  // memberId는 쿠키 저장해서 사용
  const { projectId } = params;

  const { queryKey: projectDetailKey, queryFn: projectDetailFn } =
    ProjectQueryOptions.retrieveProjectDetail(projectId);
  const { queryKey: projectCommentKey, queryFn: projectCommentFn } =
    CommentsQueryOptions.retrieveCommentList(projectId, 10);

  const [projectDetailQuery, projectCommentQuery] = await getDehydratedQueries([
    { queryKey: projectDetailKey, queryFn: projectDetailFn },
    { queryKey: projectCommentKey, queryFn: () => projectCommentFn({ pageParam: 0 }) }
  ]);

  const projectDetail = projectDetailQuery?.state.data as ProjectDetailResponse;
  const projectComment = projectCommentQuery?.state.data as GetCommentListResponse;

  const ImageSlideElements: JSX.Element[] = (projectDetail?.overview.images ?? [])
    .filter((src) => src.imageType === IMAGE_TYPE.BACKGROUND)
    .map((src, index) => (
      <div key={`Slide ${index + 1}`} className="w-[30.6rem] h-[20.4rem]">
        <SImage src={src.imageUrl} alt={`Slide ${index + 1}`} className="rounded-large" />
      </div>
    ));

  if (!projectDetail) {
    redirect('/404');
  }

  return (
    <div className="flex justify-center px-20 pt-10 pb-20 bg-slate-95">
      <Hydrate state={{ queries: [projectDetailQuery, projectCommentQuery] }}>
        <div className="w-[128rem]">
          <RouterPush className="px-2 py-1.5 flex items-center gap-1 cursor-pointer" path="/">
            <SImage src="/leftArrow.svg" width={14} height={14} />
            <p className="text-small text-slate-30">프로젝트 목록</p>
          </RouterPush>
          <div className="py-5">
            <SwiperComponent items={ImageSlideElements} />
          </div>
          <div className="w-[128rem] mt-8 flex justify-center gap-5">
            <div className="w-[95.4rem] flex flex-col gap-10">
              <ProjectDetail detail={projectDetail} />
              <CommentComponent
                projectId={projectId}
                commentInfo={projectComment}
                teamMember={projectDetail.participantList}
              />
            </div>
            <ProjectDetailSideBar
              title={projectDetail.head?.title}
              thumbnailImage={projectDetail.head?.thumbnailImageUrl}
              likeCounts={projectDetail?.likeCounts}
              teamMember={projectDetail?.participantList || []}
              viewCount={projectDetail?.viewCount}
              commentCount={projectComment?.total}
            />
          </div>
        </div>
      </Hydrate>
    </div>
  );
};

export default ProjectDetailPage;
