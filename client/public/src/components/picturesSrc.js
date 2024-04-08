export const PhotoService = {
    getData() {
        return [
            {
                itemImageSrc: './pictures/1.jpg',
                thumbnailImageSrc: './pictures - copy/1.jpg',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
            {
                itemImageSrc: './pictures/2.jpg',
                thumbnailImageSrc: './pictures - copy/2.jpg',
                alt: 'Description for Image 2',
                title: 'Title 2'
            },
            {
                itemImageSrc: './pictures/3.jpg',
                thumbnailImageSrc: './pictures - copy/3.jpg',
                alt: 'Description for Image 3',
                title: 'Title 3'
            },
            {
                itemImageSrc: './pictures/1.jpg',
                thumbnailImageSrc: './pictures - copy/1.jpg',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
            {
                itemImageSrc: './pictures/2.jpg',
                thumbnailImageSrc: './pictures - copy/2.jpg',
                alt: 'Description for Image 2',
                title: 'Title 2'
            },
            {
                itemImageSrc: './pictures/3.jpg',
                thumbnailImageSrc: './pictures - copy/3.jpg',
                alt: 'Description for Image 3',
                title: 'Title 3'
            },
            {
                itemImageSrc: './pictures/1.jpg',
                thumbnailImageSrc: './pictures - copy/1.jpg',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
            {
                itemImageSrc: './pictures/2.jpg',
                thumbnailImageSrc: './pictures - copy/2.jpg',
                alt: 'Description for Image 2',
                title: 'Title 2'
            },
            {
                itemImageSrc: './pictures/3.jpg',
                thumbnailImageSrc: './pictures - copy/3.jpg',
                alt: 'Description for Image 3',
                title: 'Title 3'
            }
           

        ];
    },

    getImages() {
        return Promise.resolve(this.getData());
    }
};

