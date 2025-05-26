declare module 'cloudinary-react' {
  import * as React from 'react';

  export interface CloudinaryContextProps {
    cloudName: string;
    children: React.ReactNode;
  }

  export class CloudinaryContext extends React.Component<CloudinaryContextProps> {}

  export interface ImageProps {
    publicId: string;
    alt?: string;
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
  }

  export class Image extends React.Component<ImageProps> {}

  export interface TransformationProps {
    width?: string | number;
    height?: string | number;
    crop?: string;
    quality?: string;
    fetchFormat?: string;
  }

  export class Transformation extends React.Component<TransformationProps> {}
}