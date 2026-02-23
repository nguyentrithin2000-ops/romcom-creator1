# Dự án: Chuyện tình thanh xuân bi hài của tôi quả nhiên là AI làm

Chắc hẳn ai ở đây cũng từng ức chế khi xem anime hay đọc light novel mà main cứ đần đụt, hoặc waifu của mình lại bị thằng main từ chối. Lúc đó chỉ ước: **"Phải chi mình được chọn lại đoạn này!"**

Đó là lý do mình build **Chuyện tình thanh xuân bi hài của tôi quả nhiên là AI làm** — một engine truyện tương tác (_Interactive Fiction_) chạy bằng AI, thiết kế riêng cho những tâm hồn yêu thích sự ngọt ngào (và cả drama) của Light Novel.

## 🎮 Cách thức hoạt động

- **Xây dựng "Love Interest"**: Bạn mô tả mẫu hình lý tưởng hoặc bối cảnh trường học mơ ước. AI sẽ tự động "thổi hồn" vào dàn nhân vật: từ cô bạn thuở nhỏ đanh đá đến hội trưởng hội học sinh lạnh lùng.
- **Tương tác không giới hạn**: Thay vì chọn A, B, C có sẵn, bạn có thể nhập bất cứ hành động nào. Muốn tỏ tình ngay chương 1 hay âm thầm bảo vệ từ xa? Thậm chí là vụt luôn? AI sẽ viết tiếp chương mới dựa trên lựa chọn đó.
- **Mỗi playthrough là một kết thúc riêng**: Không có kịch bản định sẵn, flag nổ hay không là do cách bạn đối xử với dàn nhân vật.

## 🛠 Tech stack cho ai tò mò

- **Core**: Python FastAPI microservices đảm nhận việc xử lý cốt truyện và logic tình cảm.
- **LangGraph Pipeline**: Mỗi lượt hành động sẽ qua 5 "biên tập viên" AI _(Planner điều hướng → Simulator giả lập tâm lý → Context kiểm tra lịch sử → Writer chấp bút → Critic chỉnh sửa văn phong)_.
- **Đồ thị quan hệ (Relationship Graph)**: Dùng Neo4j để lưu trữ mức độ tình cảm, thiện cảm và các mối quan hệ chồng chéo giữa dàn waifu.
- **Trí nhớ dài hạn**: Kết hợp mem0 + Qdrant để AI không bao giờ quên lời hứa của bạn từ 100 chương trước.
- **Frontend**: Next.js (Web) và React Native (Mobile) cho trải nghiệm mượt mà như đọc sách thật.

## 🧠 Thách thức lớn nhất

Viết Romcom mà AI "não cá vàng" là hỏng hết cảm xúc. Để AI ghi nhớ nhất quán từng chi tiết nhỏ (như sở thích ăn uống hay một kỷ niệm cũ), mình đã thiết lập hệ thống memory 4 tầng:

- PostgreSQL (sự kiện)
- Neo4j (biến số tình cảm)
- Qdrant (truy xuất ngữ nghĩa)
- Redis (tốc độ phản hồi)

Dự án này mình "vừa tu vừa hú", tự build một mình từ A-Z. Hiện tại tuy chưa hoàn hảo 100% nhưng đã đủ để các bạn trải nghiệm một "route" tình yêu đầu tiên rồi.

## 🔗 Mã nguồn dự án

[https://github.com/zennomi/romcom-creator](https://github.com/zennomi/romcom-creator)

Mình đang phát triển theo hướng **TAO prompt AI Build**, nên mọi góp ý về văn phong hay tính năng từ các đồng đạo yêu Light Novel đều cực kỳ quý giá. Cảm ơn mọi người!
