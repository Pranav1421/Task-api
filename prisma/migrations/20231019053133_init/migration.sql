-- CreateTable
CREATE TABLE `task` (
    `tid` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `task_id` INTEGER NOT NULL,

    PRIMARY KEY (`tid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
