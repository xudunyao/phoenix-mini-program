export type Props = {
  uploadUrl:string;
  size?:number | string | null;
  onChange?:(files: Object[], operationType: string, index: number) => void;
  onFail?:(msg: string) => void;
};

