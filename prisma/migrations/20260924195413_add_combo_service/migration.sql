-- CreateTable
CREATE TABLE "combo_services" (
    "combo_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "combo_services_pkey" PRIMARY KEY ("combo_id","service_id")
);

-- AddForeignKey
ALTER TABLE "combo_services" ADD CONSTRAINT "combo_services_combo_id_fkey" FOREIGN KEY ("combo_id") REFERENCES "combos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "combo_services" ADD CONSTRAINT "combo_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
