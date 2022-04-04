export interface Categories {
 id: number,
 name: string,
 operationId: number
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
 "category": number | string,
 "description": string
}