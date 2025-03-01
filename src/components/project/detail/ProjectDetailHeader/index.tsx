import { ClientUrl, Head, Tag } from '@/service/project/response';
import Link from 'next/link';

import { FormattedDate } from '@/components/common/Date';
import HealthCheckState from '@/components/common/HealthState';
import SImage from '@/components/common/Image';

interface ProjectDetailHeaderProps {
  head: Head;
  healthy?: boolean;
  clientUrl?: ClientUrl;
  categories?: Array<Tag>;
  viewCount?: number;
  createdAt?: string;
}

interface ProjectLinkProps {
  text: string;
  url: string;
}

const ProjectLinkItem = ({ text, url }: ProjectLinkProps) => {
  return (
    <Link href={url} target="_blank">
      <div className="px-[1rem] py-1.5 flex gap-1 items-center bg-slate-95 rounded-[999px]">
        <SImage src="/linkUrl.svg" width={18} height={18} />
        <p className="text-slate-30">{text}</p>
      </div>
    </Link>
  );
};

const ProjectTagItem = ({ tag = '프로젝트 태그' }: { tag: string }) => {
  return (
    <div className="px-3 py-1.5 text-slate-50 border border-1 border-slate-90 rounded-[999px]">
      {tag}
    </div>
  );
};

const ProjectDetailHeader = ({
  head,
  healthy,
  clientUrl,
  categories = [],
  viewCount = 0,
  createdAt
}: ProjectDetailHeaderProps) => {
  return (
    <div className="flex gap-5 p-10 text-[1.3rem] font-md border-b border-b-1 border-slate-90">
      <div className="relative w-[9.2rem] h-[9.2rem]">
        <SImage src={head.thumbnailImageUrl} className="rounded-[2.8rem]" />
      </div>
      <div className="flex-grow">
        <div className="h-10 text-2xlarge font-lb leading-8 tracking-[-0.64px]">{head.title}</div>
        <div className="flex flex-col gap-4">
          <div className="text-slate-50 text-[1.5rem]">{head.shortDescription}</div>
          <div className="flex gap-2 items-center">
            <HealthCheckState health={healthy ?? false} />
            {clientUrl &&
              Object.entries(clientUrl).map(([key, value]) => (
                <ProjectLinkItem key={key} text={key} url={value} />
              ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5 flex-wrap">
              {categories.map((tag, idx) => (
                <ProjectTagItem key={`project_tag_${idx}`} tag={tag.name} />
              ))}
            </div>
            <div className="flex items-center gap-5 shrink-0 text-xsmall text-slate-50">
              <span>조회수 {viewCount}</span>
              {createdAt && (
                <span>
                  <FormattedDate isoString={createdAt} />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailHeader;
