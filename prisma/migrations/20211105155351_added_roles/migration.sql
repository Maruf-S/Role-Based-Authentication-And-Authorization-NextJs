-- AlterTable
ALTER TABLE "users" ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT E'F name',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT E'L name';

-- CreateTable
CREATE TABLE "users_roles" (
    "roleId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "users_roles_pkey" PRIMARY KEY ("roleId","userId")
);

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
