import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { EntitySubject } from './entity.subject';
import { Company } from './company.entity';
import { CompanyType } from '../enum/company.type.enum';

@Entity('company_meta')
export class CompanyMeta implements EntitySubject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: CompanyType,
    array: false
  })
  companyType: CompanyType;

  @Column()
  isMainCorrespondence: boolean;

  @Column({ nullable: true })
  mainCorrespondenceAddress?: string;

  @Column()
  primaryRepresentativeName: string;

  @Column()
  primaryRepresentativeEmail: string;

  @Column({ nullable: true })
  secondaryRepresentativeName?: string;

  @Column({ nullable: true })
  secondaryRepresentativeEmail?: string;

  @Column({ nullable: true })
  evidenceOfRegistration?: string;

  @Column({ nullable: true })
  businessLicense?: string;

  @Column({ nullable: true })
  financialIntegrity?: string;

  @Column({ nullable: true })
  managementDossier?: string;

  @Column({ nullable: true })
  scientificExperience?: string;

  @Column({ nullable: true })
  financialExpertise?: string;

  @Column({ nullable: true })
  environmentalExpertise?: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Company, { nullable: false })
  @JoinColumn() // optional if you want to specify the FK column name
  company?: Company;


//   @Column({ unique: true })
// companyId: number;
}
