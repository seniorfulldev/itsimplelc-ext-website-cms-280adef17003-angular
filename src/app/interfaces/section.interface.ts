export interface SectionItem {
  type: string;
  title: string;
  value: string;
}
export interface Section {
    header: string,
    items: Array<SectionItem>;
}
