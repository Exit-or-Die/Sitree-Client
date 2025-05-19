import SButton from '@/components/common/Button';

interface ProfileDeleteModalProps {
  onClickClose: () => void;
  deleteProfilePage: () => void;
}

const ProfileDeleteModal = ({ onClickClose, deleteProfilePage }: ProfileDeleteModalProps) => {
  return (
    <div className="px-6 bg-white-100 rounded-[2.4rem] text-small text-start w-[36rem]">
      <div className="pt-6 text-large font-lb">작성한 기술을 삭제하시겠어요?</div>
      <div className="py-4 text-slate-50">한 번 삭제한 내용은 되돌릴 수 없어요.</div>
      <div className="py-4 flex justify-end gap-2">
        <SButton className="border-none bg-slate-95" onClick={onClickClose}>
          아니요
        </SButton>
        <SButton onClick={deleteProfilePage} className="border-none bg-slate-20 text-white-100">
          삭제하기
        </SButton>
      </div>
    </div>
  );
};

export default ProfileDeleteModal;
