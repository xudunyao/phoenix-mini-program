export type Props = {
  mode?: 'scaleToFill'|'aspectFit'|'aspectFill'|'widthFix'|'top'|'bottom'|'center'|'left'|'right'|'top left'|'top right'|'bottom left'|'bottom right',
  multiple?: boolean;
  files:Object[];
  size?:number | string | null;
  onChange?:(files: Object[], operationType: string, index: number) => void;
  onFail?:(msg: string) => void;
  onImageClick?:(index: number, file: Object) => void;
};