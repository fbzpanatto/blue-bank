export interface Categories {
 id: number,
 name: string
}

export interface Operation {
 id: number,
 name: string
}

export interface Releases {
 "id": number,
 "releaseDate": Date,
 "releaseValue": number,
 "userId": number,
 "operation": number,
 "category": number,
 "description": string
}