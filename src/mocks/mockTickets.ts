interface Ticket {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  accuracyScore: number;
  theaterName: string;
  imgUrl: string;
}

export const mockTickets: Ticket[] = [
  {
    id: 1,
    title: '어쩌면 해피엔딩',
    startDate: '2025.08.24',
    endDate: '2025.10.23',
    accuracyScore: 80,
    theaterName: '홍익대 대학로 아트센터',
    imgUrl:
      'https://i.namu.wiki/i/U9Lg3cRYv3VnSiI31kEHQaxLLiPgyfyZH3F8scX88mU34gHtDbnoxEDcc-xLSAphfjgxIs58rFC3RypFWe-af7BpWFEep7HS9lyFJDsTZnGvTEgW3uNwtKPo5PEKvycvpHcEfp6SoVoV_fQg9SQbhw.webp',
  },
  {
    id: 2,
    title: '레베카',
    startDate: '2025.08.01',
    endDate: '2025.08.29',
    accuracyScore: 80,
    theaterName: '예스24 스테이지',
    imgUrl:
      'https://i.namu.wiki/i/xHrTo_MME8zcizXfSyYXxer_s1P1Wi7CLOx-2qViqBx4KG1tYazMNsIrfbWpbn20q0lQnaDS4pq-QhyUz5p_HrcSNub6HnHNSaPXS_e--WC-27armFjkuIHVeKggqayn6CaObwjybWS7hMM-GWNInA.webp',
  },
  {
    id: 3,
    title: '빨래',
    startDate: '2025.09.12',
    endDate: '2025.11.21',
    accuracyScore: 80,
    theaterName: '홍익대 대학로 아트센터',
    imgUrl:
      'https://i.namu.wiki/i/dEyX2CoC8rvhHZib_dKelzQ9JZjUMgNsDMXEM7U47PBCQfG1VvWvWE-g_Qpd6qiR74U2M4BgdZom4vtgPmkQdTcbavk5bt-HVMFe8HR7fX3oRIqJVCwKXSo2UvtljMmqS9TPSwWCP12i_7GHTUxc8w.webp',
  },
  {
    id: 4,
    title: '리틀잭',
    startDate: '2026.01.22',
    endDate: '2026.07.22',
    accuracyScore: 80,
    theaterName: '신한카드 블루스퀘어',
    imgUrl:
      'https://i.namu.wiki/i/0rNTm3SA36aMdfPu_ASlgLWOG-Ba56S7YCT6KAil_OQ_PaKWiyvcqj7wTzeXM-RAYFbp4CluhAVzyiSTY9TTIrDY62SNsVAStAsWizt0qeNFI0FskEzzr6sSSrBwJLpBvrSoJHq5-q13iTgEIvxfIw.webp',
  },
  {
    id: 5,
    title: '팬레터',
    startDate: '2025.08.05',
    endDate: '2025.09.23',
    accuracyScore: 80,
    theaterName: '홍익대 대학로 아트센터',
    imgUrl:
      'https://i.namu.wiki/i/5RYEhSmYEth2WjP3f6o-HQqdExOfSDYMieuxd21Er9_XZd-pdGHCRzhvICleuT16Yai9A22jt3ymJSbYM90uTan_L0jHodLtKNb9ItMNVeTGY3dw9U_hzfS-rKt4fc4InJKVlm4lucO9ctyFkzxNIQ.webp',
  },
  {
    id: 6,
    title: '위키드',
    startDate: '2025.12.24',
    endDate: '2025.12.24',
    accuracyScore: 80,
    theaterName: '홍익대 대학로 아트센터',
    imgUrl:
      'https://i.namu.wiki/i/cx1m1xXtoNTy_QO1wrkBcHTDwTM2H2ApQ18D-J3Htg1JS9T0aKlf9l5CXBCbQtwpn_73-WWAEAQbpjUkvSVoDxsmw_XxhrCTQniVEWNhvx566KVAzxBJd9KqpCzmBQOVRtbwlE-E4kWZ1CSQVHewtw.webp',
  },
];
