import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { LoggerModule } from "nestjs-pino";
import config from "mikro-orm.config";
import { JwtMiddleware } from "./common/jwtMiddleware";
import pino, { DestinationStream } from "pino";
import { v4 } from "uuid";
import { VendorModule } from "./vendor/vendor.module";
import { PurchaseOrderModule } from "./purchaseOrder/purchaseOrder.module";

const getMikroORMConfig = async () => {
  return config;
};

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const streams: DestinationStream[] = [process.stdout];
        const env = configService.get("NODE_ENV");
        return {
          pinoHttp: [
            {
              genReqId: () => v4().replace(/-/g, ""),
              ...(env === "development"
                ? {
                    transport: {
                      target: "pino-pretty",
                      options: { colorize: true },
                    },
                  }
                : {}),
            },
            pino.multistream(streams),
          ],
        };
      },
    }),
    ConfigModule.forRoot(),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMikroORMConfig,
    }),
    AuthModule,
    UserModule,
    VendorModule,
    PurchaseOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// attaching middleware to every api request so middleware will extract the userId form token and attach this to request.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes("*");
  }
}
