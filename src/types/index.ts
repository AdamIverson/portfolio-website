export interface Photo {
    id: string;
    title: string;
    description?: string;
    url: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    url?: string;
    technologies: string[];
}