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
        const loaded = [JSON.parse(readFileSync(this.resource, 'utf-8')).albums];
        for(const album of loaded) {
            for(const song of album) {
                song.tracks.forEach((track: string) => {
                    this.loaded.push(track)
                })
                // console.log(song.tracks)
            }
           
        }
        // console.log(this.loaded)
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

    getPlaylists() {
        let listNames = [];
        for (const lists of this.playlists) {
            for (const list in lists.name) {
                listNames.push(list)
            }
        }
        return listNames

    }


}


let local = new PlaylistImporter(new LocalImporter('./local.json'));
let localpl = local.importPlaylist();



