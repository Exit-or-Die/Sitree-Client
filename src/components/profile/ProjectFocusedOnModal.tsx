'use client';

import ProfileQueryOptions from '@/service/profile/queries';
import { FocusedPointParams } from '@/service/profile/request';
import { FocusPoint } from '@/service/profile/response';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState, memo } from 'react';

import SButton from '../common/Button';
import SImage from '../common/Image';
import SvgIcon from '../common/SVGIcon';
import STextarea from '../common/Textarea';

type Props = {
  onClickClose: () => void;
  name: string;
  projectId: string;
  isMe: boolean;
  participantId?: string;
  focusPoint?: FocusPoint;
};

const MAX_FIELDS = 3;

const SortableItemComponent = ({
  id,
  field,
  onRemove,
  onTextChange
}: {
  id: number;
  field: { id: number; text: string };
  onRemove: (id: number) => void;
  onTextChange: (id: number, text: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} className="mt-4">
      <div className="flex items-start">
        <div className="flex flex-col items-center">
          <SvgIcon
            icon="hamburger"
            width={20}
            height={20}
            color="#778195"
            className="mr-2 cursor-grab"
            {...attributes}
            {...listeners}
          />
          <SImage
            src="/trash.svg"
            alt="trash"
            width={16}
            height={16}
            className="mr-2 cursor-pointer mt-1"
            onClick={() => onRemove(id)}
          />
        </div>
        <div className="w-full">
          <STextarea
            value={field.text}
            onChange={(e) => onTextChange(id, e.target.value)}
            placeholder="프로젝트 과정에서 집중했던 부분과 어필하고 싶은 점을 작성해 주세요."
            maxLength={250}
            className="w-full border p-3 rounded-base text-small resize-none min-h-[184px] placeholder-slate-60 outline-tree-50"
          />
        </div>
      </div>
    </div>
  );
};

const SortableItem = memo(SortableItemComponent);
SortableItem.displayName = 'SortableItem';

const ProjectFocusedOnModal = ({
  onClickClose,
  name,
  projectId,
  participantId,
  focusPoint,
  isMe
}: Props) => {
  const router = useRouter();

  const initialFields = focusPoint?.focusPoints?.length
    ? focusPoint.focusPoints.map((text, index) => ({ id: index + 1, text }))
    : [{ id: 1, text: '' }];

  const [viewFields, setViewFields] = useState(initialFields);
  const [editFields, setEditFields] = useState<typeof initialFields>([]);
  const [isEdit, setIsEdit] = useState(false);

  const { mutate: updateFocusedPoint } = useMutation({
    mutationFn: (formValues: FocusedPointParams) =>
      ProfileQueryOptions.updateFocusedPoints(formValues).mutateFn()
  });

  const onClickUpdate = () => {
    if (!participantId) return;
    const focusPoints = editFields.map((field) => field.text);
    const payload = {
      projectId,
      participantId,
      focusPoints,
      focusPointId: focusPoint?.focusPointId
    };
    updateFocusedPoint(payload);
    setViewFields(editFields);
    setIsEdit(false);
    router.refresh();
    onClickClose();
  };

  const handleAddField = () => {
    if (editFields.length < MAX_FIELDS) {
      setEditFields([...editFields, { id: Date.now(), text: '' }]);
    }
  };

  const handleRemoveField = (id: number) => {
    setEditFields(editFields.filter((field) => field.id !== id));
  };

  const handleTextChange = (id: number, newText: string) => {
    setEditFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, text: newText } : field))
    );
  };

  const onClickToggleType = () => {
    if (!isEdit) {
      setEditFields([...viewFields]);
    }
    setIsEdit(!isEdit);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="p-6 bg-white rounded-large shadow-lg w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-large font-bold text-slate-10 flex items-center">
          focused on 작성 <span className="ml-2 text-slate-50 font-md text-small">{name}</span>
        </h2>
        {isEdit ? (
          <SButton
            className={`${editFields.length < MAX_FIELDS ? 'bg-tree-93 text-green-700' : 'bg-slate-95 text-slate-80'} px-3 py-1 rounded-base text-sm border-0`}
            onClick={handleAddField}
            disabled={editFields.length >= MAX_FIELDS}
          >
            <SvgIcon
              icon="plus"
              width={16}
              height={16}
              className="mr-1"
              color={editFields.length < MAX_FIELDS ? '#03854E' : '#c8d0dd'}
            />
            항목 추가
          </SButton>
        ) : (
          <SButton
            className="text-white-100 bg-tree-50 text-small rounded-large border-0 ml-auto font-rg px-3 py-2 flex"
            onClick={() => router.push(`/project/${projectId}`)}
          >
            <div className="mr-1">프로젝트 소개</div>
            <SvgIcon
              icon="externalLink"
              width={16}
              height={16}
              color="#FFFFFF"
              className="self-center"
            />
          </SButton>
        )}
      </div>

      {isEdit ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (active.id !== over?.id) {
              const oldIndex = editFields.findIndex((f) => f.id === active.id);
              const newIndex = editFields.findIndex((f) => f.id === over?.id);
              setEditFields(arrayMove(editFields, oldIndex, newIndex));
            }
          }}
        >
          <SortableContext
            items={editFields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            {editFields.map((field) => (
              <SortableItem
                key={field.id}
                id={field.id}
                field={field}
                onRemove={handleRemoveField}
                onTextChange={handleTextChange}
              />
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        <ul className="list-disc mt-4 p-5">
          {viewFields.map((field, i) => (
            <li key={i} className="text-small text-left text-slate-30">
              {field.text}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between mt-4">
        <div
          className={`text-slate-30 text-[13px] flex items-center ${!isEdit ? 'invisible' : ''}`}
        >
          <SImage src="/tip.svg" alt="info" width={14} height={14} className="mr-1" />
          작성 방법
        </div>
        <div className="flex gap-2">
          {isEdit ? (
            <>
              <SButton
                onClick={onClickToggleType}
                className="bg-slate-95 text-slate-30 rounded-large text-small border-0"
              >
                취소
              </SButton>
              <SButton
                onClick={onClickUpdate}
                className="bg-tree-50 text-white-100 rounded-large text-small border-0"
              >
                등록
              </SButton>
            </>
          ) : (
            <>
              <SButton
                onClick={onClickClose}
                className="bg-slate-95 text-slate-30 rounded-large text-small border-0"
              >
                닫기
              </SButton>
              {isMe && (
                <SButton
                  onClick={onClickToggleType}
                  className="bg-white-100 text-slate-30 rounded-large text-small"
                >
                  수정
                </SButton>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectFocusedOnModal;
