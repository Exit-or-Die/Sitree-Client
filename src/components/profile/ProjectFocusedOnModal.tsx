'use client';

import { useState, useEffect } from 'react';
import SButton from '../common/Button';
import SImage from '../common/Image';
import { FocusPoint } from '@/service/profile/response';
import SvgIcon from '../common/SVGIcon';

type Props = {
  onClickClose: () => void;
  name: string;
  projectId: number;
  participantId?: string;
  focusPoint?: FocusPoint;
};

const MAX_FIELDS = 3;

const ProjectFocusedOnModal = ({ onClickClose, name, projectId, participantId, focusPoint }: Props) => {

  const initialFields = focusPoint!.focusPoints!.length > 0
    ? focusPoint!.focusPoints.map((text, index) => ({ id: index + 1, text }))
    : [{ id: 1, text: '' }];
  
  const [fields, setFields] = useState(initialFields);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (focusPoint?.focusPoints) {
      setFields(focusPoint.focusPoints.length > 0
        ? focusPoint.focusPoints.map((text, index) => ({ id: index + 1, text }))
        : [{ id: 1, text: '' }]);
    }
  }, [focusPoint]);

  const handleAddField = () => {
    if (fields.length < MAX_FIELDS) {
      setFields([...fields, { id: Date.now(), text: '' }]);
    }
  };

  const handleRemoveField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleTextChange = (id: number, newText: string) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, text: newText } : field)));
  };

  const onClickToggleType = () => {
    setIsEdit(!isEdit);
  }

  return (
    <div className="p-6 bg-white rounded-large shadow-lg w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-large font-bold text-slate-10 flex items-center">
          focused on 작성 {' '}
          <span className="ml-2 text-slate-50 font-md text-small">{name}</span>
        </h2>
        <SButton
          className={`${fields.length < MAX_FIELDS ? 'bg-tree-93 text-green-700' : 'bg-slate-95 text-slate-80'} px-3 py-1 rounded-base text-sm border-0 ${!isEdit ? 'hidden' : ''}`}
          onClick={handleAddField}
          disabled={fields.length >= MAX_FIELDS}
        >
          <SvgIcon
            icon="plus"
            width={16}
            height={16}
            className="mr-1"
            color="#03854E"
          />
          항목 추가
        </SButton>
      </div>

      {isEdit ? fields.map((field) => (
        <div key={field.id} className="mt-4">
          <div className="flex items-start">
            <SImage
              src="/trash.svg"
              alt="trash"
              width={16}
              height={16}
              className="mr-2 cursor-pointer"
              onClick={() => handleRemoveField(field.id)}
            />
            <textarea
              value={field.text}
              onChange={(e) => handleTextChange(field.id, e.target.value)}
              placeholder="프로젝트 과정에서 집중했던 부분과 어필하고 싶은 점을 작성해 주세요."
              maxLength={250}
              className="w-full border p-3 rounded-base text-small resize-none min-h-[184px] placeholder-slate-60 outline-tree-50"
            />
          </div>
          <div className="text-right text-slate-60 text-xsmall mt-1 ml-2">{field.text.length}/250</div>
        </div>
      )) : (
        <ul className="list-disc mt-4 p-5">
          {fields.map((field) => 
            <li className="text-small text-left text-slate-30">{field.text}</li>
          )}
        </ul>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className={`text-slate-30 text-[13px] flex items-center ${!isEdit ? 'invisible' : ''}`}>
          <SImage src="/tip.svg" alt="info" width={14} height={14} className="mr-1" />
          작성 방법
        </div>
        <div className="flex gap-2">
          {isEdit ? 
            <>
              <SButton onClick={onClickToggleType} className="bg-slate-95 text-slate-30 rounded-large text-small border-0">취소</SButton>
              <SButton className="bg-tree-50 text-white-100 rounded-large text-small border-0" disabled>
                등록
              </SButton>
            </> : <>
              <SButton onClick={onClickClose} className="bg-slate-95 text-slate-30 rounded-large text-small border-0">닫기</SButton>
              <SButton onClick={onClickToggleType} className="bg-white-100 text-slate-30 rounded-large text-small">
                수정
              </SButton>
            </>}
        </div>
      </div>
    </div>
  );
};

export default ProjectFocusedOnModal;
