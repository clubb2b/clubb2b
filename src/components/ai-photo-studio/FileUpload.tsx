import React from 'react';
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Upload } from 'lucide-react';
interface FileUploadProps {
  selectedImage: string | null;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}
const FileUpload: React.FC<FileUploadProps> = ({
  selectedImage,
  onFileUpload,
  fileInputRef
}) => {
  return;
};
export default FileUpload;