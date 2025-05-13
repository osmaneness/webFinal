import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUser() {
  try {
    const email = 'admin@example.com';

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (user) {
      console.log('Kullanıcı bulundu:');
      console.log('ID:', user.id);
      console.log('E-posta:', user.email);
      console.log('Rol:', user.role);
      console.log('Şifre hash:', user.password);
    } else {
      console.log('Kullanıcı bulunamadı:', email);
    }
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser(); 