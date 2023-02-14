class Artist {
    name: string = '';
    albums: Album[] = [];

    constructor(name: string) {
        this.name = name
    }

    addAlbum(album: Album): void {
        this.albums.push(album)
    }
}

class Album {
    private _title: string = '';
    artist!: Artist;
    year: number = 0;
    tracks: Song[] = [];

    constructor(title: string, artist: Artist, year: number) {
        this._title = title;
        this.artist = artist;
        this.year = year;
    }

    get title() {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
    }

    addTrack(track: Song): void {
        this.tracks.push(track)
    }
}

class Song {
    private _title: string = '';

    constructor(title: string) {
        this._title = title;
    }

    get title() {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
    }
}

class Playlist {
    private _name: string = '';
    private _songList: Song[] = [];
    
    constructor(name: string){
        // this._songList = this.songList;
        this._name = name
    }

    get name() {
        return this._name
    }

    set name(name: string) {
        this._name = name
    }

    get songList() {
        return this._songList
    }

    set songList(songList: Song[]) {
        this._songList = songList
    }

    addAlbum(album: Album): void {
        album.tracks.forEach((track) => this._songList.push(track))
    }
}

import { readFileSync } from "fs";

interface IImportable {
    loadPlaylist():string[];
}

class PlaylistImporter {
    importMethod!: IImportable;

    constructor(importMethod: IImportable) {
        this.importMethod = importMethod
    }

    importPlaylist() {
        this.importMethod;

    }

}

class LocalImporter implements IImportable {
    resource: string = '';
    loaded: string[] = [];

    constructor(resource: string) {
        this.resource = resource
        this.loaded = this.loadPlaylist();
    }

    loadPlaylist(): string[] {
        const loaded = JSON.parse(readFileSync(this.resource, 'utf-8'));
        for(const album of loaded.albums.tracks) {
            album.forEach((track: string) => {
                this.loaded.push(track)
            })
        }
        console.log(`Your playlist at location ${this.resource} will be loaded`);
        return this.loaded
    }


}

class CloudImporter implements IImportable {
    resource: string = '';
    loaded: string[] = [];

    constructor(resource: string) {
        this.resource = resource
        this.loaded = this.loadPlaylist();
    }

    loadPlaylist(): string[] {
        return []
    }

    // loadPlaylist(): string[] {
    //     let pl = new Playlist(”cool songs”); 
    //     pl.addAlbum(new Album(etc))) 
    //     return pl    }

}

class User {
    private _username: string = '';
    private _password: string = '';

    playlists!: Playlist[];
    albums!: Album[];

    constructor(username: string, password: string) {
        this._username = username;
        this._password = password;
    }

    get username() {
        return this._username
    }

    set username(username: string) {
        this._username = username
    }

    get password() {
        return this._password
    }

    set password(password: string) {
        this._password = password
    }


    addPlaylist(playlist: Playlist) {
        this.playlists.push(playlist)
    }

    addAlbum(album: Album) {
        this.albums.push(album)
    }

    getSongs() {
        let songNames = [];
        for(const album of this.albums) {
            for(const song in album.tracks) {
                songNames.push(song)
            }
        }
        return songNames
    }

    getAlbums() {
        let albumNames = [];
        for (const album of this.albums) {
            
            albumNames.push(album.title)
            
        }
        return albumNames
    }

    // getPlaylists() {

    // }


}


// let local = new PlaylistImporter(new LocalImporter('./local.json'));
// console.log(local.importPlaylist())

// const cloud = new CloudImporter('./local.com');
// console.log(cloud.importPlaylist())

// let artist = new Artist("Muse");
// console.log(artist)
// let album = new Album('2ND LAW', artist, 2012);
// console.log(album)
// let song = new Song("Madness");
// album.addTrack(song)
// console.log(album)

// let playlist = new Playlist('FUN SONGS');
// playlist.addAlbum(album)
// console.log(playlist)


// let a = (JSON.parse(readFileSync('./local.json', 'utf-8')))
// console.log(a.albums)
let user = new User('john',"afvvbfs")
console.log(user)