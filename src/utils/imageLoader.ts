export const imageLoader = (imagePath: string): string => {
    try {
        return require(`${imagePath}`);
    } catch (error) {
        console.error(`Error loading image at ${imagePath}:`, error);
        return '';
    }
};