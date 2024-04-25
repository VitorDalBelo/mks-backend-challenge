import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name:"movies",})
export class Movie {
    @PrimaryGeneratedColumn()
    id : number;
    @Column({name:"title", length:255, nullable:false})
    title: string

    @Column({name:"director", length:255, nullable:false})
    director: string
    @Column({name:"release_date", type:"date", nullable:false})
    release_date: Date

    @Column({name: "genre",length:255,nullable: false})
    genre: string;

    @Column({ name: "synopsis", type: "text", nullable: false })
    synopsis: string;

    @CreateDateColumn()
    public created_at: Date;
    
    @UpdateDateColumn({onUpdate:"now()"})
    public updated_at: Date;
}
