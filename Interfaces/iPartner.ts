export interface iParner {
    id: number;
    attributes: {
        name: string;
        logo: {
            data: {
                attributes: {
                    alternativeText: string | null
                    url: string
                }
                id: number
            }
        }
    }
}

export default iParner;
